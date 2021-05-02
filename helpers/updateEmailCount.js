require('dotenv').config();
const fetch = require('node-fetch')

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


function executeEmailCountUpdate(email, operationsDoc) {
  return fetchGraphQL(
    operationsDoc,
    "emailCountUpdate",
    { "email": email }
  );
}

async function startExecuteEmailCountUpdate(email, operationsDoc) {
  const { errors, data } = await executeEmailCountUpdate(email, operationsDoc);

  if (errors) {
    // handle those errors like a pro
    return (errors);
  }

  // do something great with this precious data
  return (data);
}


exports.updateCount = async function (email) {
  const operationsDoc = `
        mutation emailCountUpdate($email: String = "") {
            update_users(where: {email: {_eq: $email}}, _inc: {email_count: 1}) {
                affected_rows
            }
        }
      `;

  result = await startExecuteEmailCountUpdate(email, operationsDoc);
}