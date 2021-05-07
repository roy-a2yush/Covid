const fs = require('fs')
require('dotenv').config();
const fetch = require('node-fetch')

exports.updateStatus = async (req, res) => {

    let id = req.params.id
    let status = req.params.status

    const operationsDoc = `
    mutation updateRequestStatus($status: String = "", $id: bigint = "") {
      update_requests(where: {id: {_eq: $id}, flag: {_eq: 0}}, _set: {status: $status, flag: 1}) {
        affected_rows
      }
    }
  `;

  startExecuteUpdateRequestStatus(status, id, res, operationsDoc);

}

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
        "https://covid-plasma.herokuapp.com/v1/graphql",
      {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_SECRET
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );
  
    return await result.json();
  }
  
  function executeUpdateRequestStatus(status, id, operationsDoc) {
    return fetchGraphQL(
      operationsDoc,
      "updateRequestStatus",
      {"status": status, "id": id}
    );
  }
  
  async function startExecuteUpdateRequestStatus(status, id, res, operationsDoc) {
    const { errors, data } = await executeUpdateRequestStatus(status, id, operationsDoc);
  
    if (errors) {
      // handle those errors like a pro
      // res.render(__dirname+'error')
      res.status(400).send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>plasma19india</title>
      </head>
      <body>
          <center>
              <h1>OOPS! Something went wrong</h1>
              <br>
              <br>
              <h2>Please share our site with more people for more plasma donors to join us.</h2><br><br>
              <a href="https://www.plasma19india.org">Visit plasma19india</a>
          </center>
      </body>
      </html>`)
    }
  
    // do something great with this precious data
    // res.render('success')
    if(data.update_requests.affected_rows == 0) {
      res.status(400).send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>plasma19india</title>
      </head>
      <body>
          <center>
              <h1>OOPS! Something went wrong</h1>
              <br>
              <br>
              <h2>Please share our site with more people for more plasma donors to join us.</h2><br><br>
              <a href="https://www.plasma19india.org">Visit plasma19india</a>
          </center>
      </body>
      </html>`)
    } else {
      res.status(200).send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>plasma19india</title>
      </head>
      <body>
          <center>
              <h3>Thanks for your communication!</h3>
              <br>
              <br>
              <h5>Please share our site with more people for more plasma donors to join us.</h5><br><br>
              <a href="https://www.plasma19india.org">Visit plasma19india</a>
          </center>
      </body>
      </html>`)
    }
  }