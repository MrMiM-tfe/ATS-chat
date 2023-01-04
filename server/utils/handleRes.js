exports.HandleRes = (res, data) => {
    if (!Object.values(data)[0]) {
        return res.status(404).json({
            type: "Error",
            message: "data not found"
        })
    }

    const resData = {
        type:"Success",
        message: "OK"
    }

    resData[Object.keys(data)[0]] = Object.values(data)[0]

    return res.json(resData)
}

exports.Res = {
    Success: (res, data) => {
        if (!Object.values(data)[0]) {
            return res({
                type: "Error",
                message: "data not found"
            })
        }

        const realData = Object.values(data)[0]

        if (realData.type === "Error") {
            return res({
                type: realData.type,
                message: realData.message
            })
        }
    
        const resData = {
            type:"Success",
            message: "OK"
        }
    
        resData[Object.keys(data)[0]] = Object.values(data)[0][Object.keys(realData)[2]]
    
        return res(resData)
    },
    Error: (res, message) => {
        return res({
            type: "Error",
            message
        })
    },
    Check: (res) => {
        if (typeof res !== "function"){
            return true
        }

        return false
    }
}

exports.HandleReturn = {
    ok: (data) => {
        if (!Object.values(data)[0]) {
            return {
                type: "Error",
                message: "data not found"
            }
        }
    
        const Data = {
            type:"Success",
            message: "OK"
        }
    
        Data[Object.keys(data)[0]] = Object.values(data)[0]
    
        return Data
    },
    error: (message, statusCode = 400) => {
        return {
            type: "Error",
            message
        }
    }
}