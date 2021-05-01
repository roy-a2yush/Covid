const fs = require('fs')
require('dotenv').config();
const nodemailer = require("nodemailer")
const fetch = require('node-fetch')

const SendEmail = require('../../helpers/email')

//hasura cRud
function fetchGraphQL(operationsDoc, operationName, variables) {
    return fetch(
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
    ).then((result) => result.json());
}

function fetchGetDonorEmail(_eq, operationsDoc) {
    return fetchGraphQL(
        operationsDoc,
        "GetDonorEmail",
        { "_eq": _eq }
    );
}


exports.email = async (req, res) => {

    let _eq = req.body._eq

    const operationsDoc = `
        query GetDonorEmail($_eq: Int!) {
            users(where: {id: {_eq: $_eq}}) {
                email
                name
            }
        }
    `

    fetchGetDonorEmail(_eq, operationsDoc)
        .then(({ data, errors }) => {
            if (errors) {
                // handle those errors like a pro
                res.status(400).send(errors)
            }
            // do something great with this precious data
            // res.status(400).send(data.users[0])
            SendEmail.send(data.users[0].email,data.users[0].name, req , res)
        })
        .catch((error) => {
            // handle errors from fetch itself
            res.status(400).send(error)
        });

}