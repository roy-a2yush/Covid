// const PlasmaDonor = require('../models/Plasma')

// exports.upload = async function(req, res, newPlasmaDonor) {
//     try {
//         const uploadResult = await newPlasmaDonor.save()
//         res.status(201).json(uploadResult)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// }
require('dotenv').config()
const fetch = require('node-fetch')

exports.search = async function(res, blood, state) {
    // PlasmaDonor.find(findParameter).exec(function(err, doc) {
    //     if(err) {
    //         res.status(400).send(err)
    //     }
    //     if(doc.length) {
    //         res.status(200).send(doc)
    //     } else {
    //         res.status(404).send("Not found")
    //     }
    // })
    const operationsDoc = `
        query FetchAllDonors($blood: [String!] , $state: String!) {
            users(where: {status: {_eq: "true"}, blood_group: {_in: $blood}, state: {_eq: $state}}) {
                state
                pin_code
                picture
                name
                id
                district
                blood_group
            }
        }
    `;
    startFetchFetchAllDonors(blood, state, operationsDoc, res);
}

/*
This is an example snippet - you should consider tailoring it
to your service.
*/

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
  
  function fetchFetchAllDonors(blood, state, operationsDoc) {
    return fetchGraphQL(
      operationsDoc,
      "FetchAllDonors",
      {"blood": blood, "state": state}
    );
  }
  
  async function startFetchFetchAllDonors(blood, state, operationsDoc, res) {
    const { errors, data } = await fetchFetchAllDonors(blood, state, operationsDoc);
  
    if (errors) {
      // handle those errors like a pro
      res.status(400).send(errors);
    }
  
    // do something great with this precious data
    res.status(200).send(data);
  }