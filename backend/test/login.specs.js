const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

let token;

describe("Users route", () => {
  const login = "/api/v1/users/login";
  const invalid = {
    username: "abcd",
    password: "12345678",
  };
  const correctUser = { username: "zaidm124", password: "12345678" };

  describe("login", () => {
    it("should login and give access token", (done) => {
      chai
        .request(app)
        .post(login)
        .send(correctUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).not.to.be.empty;
          expect(res.body).to.have.property("success").to.equal(true);
          expect(res.body).to.have.property("message");
          expect(res.body)
            .to.have.property("responses")
            .to.have.property("accessToken");
          token = res.body.responses.accessToken;
          expect(res.body)
            .to.have.property("responses")
            .to.have.property("user_details")
            .to.have.property("_id");
          detail = res.body.responses.user_details;
          done();
        });
    });

    it("should not login due to invalid credentials", (done) => {
      chai
        .request(app)
        .post(login)
        .send(invalid)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).not.to.be.empty;
          expect(res.body).to.have.property("success").to.equal(false);
          expect(res.body).to.not.have.property("responses");
          done();
        });
    });
  });
});
