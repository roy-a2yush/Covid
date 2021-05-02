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
      res.status(400).send(errors)
    }
  
    // do something great with this precious data
    // res.render('success')
    res.status(200).send(data)
  }