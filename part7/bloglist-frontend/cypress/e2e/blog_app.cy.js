import blog from "../../../../part4/bloglist/src/models/blog";
import login from "../../src/services/login";

describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    const user2 = {
      name: "test name",
      username: "test",
      password: "test",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);
  });

  it("front page can be opened", function () {
    cy.contains("blogs");
    cy.contains("login");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();

    cy.contains("Matti Luukkainen logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "wrong username or password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "mluukkai",
        password: "salainen",
      });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("test");
      cy.get("#url").type("http://www.baidu.com");
      cy.contains("save").click();
      cy.contains("a blog created by cypress");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.addBlog({
          title: "another blog created",
          author: "test",
          url: "http://www.google.com",
        });
      });
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.addBlog({
          title: "first blog",
          author: "test",
          url: "http://www.google.com",
          likes: 5
        });
        cy.addBlog({
          title: "second blog",
          author: "test",
          url: "http://www.google.com",
          likes: 2,
        });
        cy.addBlog({
          title: "third blog",
          author: "test",
          url: "http://www.google.com",
          likes: 9
        });
      });

      it.only("one of those can be made like", function () {
        cy.contains("second blog").contains("show").click();
        cy.get("#like").click();

        cy.contains("second blog").get('.likes').contains("3");
      });

      it("one of those can be delete", function(){
        cy.contains("second blog").contains("show").click();
        cy.get("#remove").click();

        cy.get("html").should("not.contain", "second blog");
      })

      it.only("blogs should order by likes", function() {
        let pre = Number.MAX_VALUE;
        cy.get('.blog').then((blog) => {
          blog.map(function(index, el) {
            cy.wrap(el).contains('show').click();
          })
        })
        
        cy.get('.likes').then((likes) => {
          likes.map((idx, el) => {
            expect(pre).to.be.greaterThan(Number(el.innerHTML))
            pre = Number(el.innerHTML)
          })
        })
      })

      describe("other user can't delete blog", function () {
        beforeEach(function () {
          cy.login({username: 'test', password: 'test'});
        });

        it("one of those can be delete", function(){
          cy.contains("first blog").contains("show").click();
  
          cy.contains("first blog").should("not.contain", "remove");
        })
      })

    });
  });
});
