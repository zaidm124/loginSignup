const chai = require("chai");
const app = require("../server");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

let token;

describe("User Routes", () => {
  const register = "/api/v1/users/register";
  const newUser = {
    username: "abcd",
    password: "12345678",
    name: "new",
    userType: "superAdmin",
  };
  const oldUser = {
    username: "zaidm124",
    password: "12345678",
    name: "zaid",
    userType: "admin",
  };

  describe("sign up", () => {
    it("Sign up and store in database and return access token", (done) => {
      chai
        .request(app)
        .post(register)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).not.to.be.empty;
          expect(res.body).to.have.property("success").to.equal(true);
          expect(res.body)
            .to.have.property("responses")
            .to.have.property("accessToken");
          token = res.body.responses.accessToken;
          //   console.log(token);
          expect(res.body)
            .to.have.property("responses")
            .to.have.property("user_details");
          done();
        });
    });

    it("Status error when user is already present in database", (done) => {
      chai
        .request(app)
        .post(register)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).not.to.be.empty;
          expect(res.body).to.have.property("success").to.equal(false);
          expect(res.body).to.not.have.property("responses");
          done();
        });
    });
  });
});
