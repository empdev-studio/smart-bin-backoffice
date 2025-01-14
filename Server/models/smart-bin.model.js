const connection = require('./base.model');
const SmartBinModel = {}

SmartBinModel.InsertFullBinBy = () => {
    let sql = "INSERT INTO `smart-bin`.`tb_full_bin` (`date`, `volume`) VALUES (CURDATE(), '2');";
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
    })
}

SmartBinModel.getFullBinBy = (data) => {
    let _from = 'from_date' in data && Boolean(data['from_date']) ? ` AND date >= '${data['from_date']}' ` : '';
    let _to = 'to_date' in data && Boolean(data['to_date']) ? `AND date <= '${data['to_date']}'` : '';
    let sql = `SELECT SUM(volume) as volume, COUNT(date) as count, date FROM \`smart-bin\`.tb_full_bin where TRUE ${_from} ${_to} group by (date);`;
    return new Promise(function(resolve, reject){
        connection.query(sql, function(err, rows){                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        })
    })
}

module.exports = SmartBinModel