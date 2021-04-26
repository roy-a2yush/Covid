const mongoose = require('mongoose')

exports.assembleFindParameter = function(state, id, pincode, district, name) {
    var findParameter = {}
    if(state) {
        state = {
            "State": state
        }
        findParameter = {...findParameter, ...state}
    }

    if(id) {
        id = {
            "_id": mongoose.Types.ObjectId(id)
        }
        findParameter = {...findParameter, ...id}
    }

    if(pincode) {
        pincode = {
            "Pincode": pincode
        }
        findParameter = {...findParameter, ...pincode}
    }

    if(district) {
        district = {
            "District": district
        }
        findParameter = {...findParameter, ...district}
    }

    if(name) {
        name = {
            "Name": name
        }
        findParameter = {...findParameter, ...name}
    }

    return findParameter
}