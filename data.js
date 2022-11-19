import SQLite from 'react-native-sqlite-storage';
import WebSQLite from 'websqlite';

const SQLiteManager = new WebSQLite();

export default class Data {

    /**
     * 
     */
    init() {
        SQLiteManager.init({
            id: 'dbroom',
            dbObject: SQLite,
        })
    }

    /**
     * 
     * @param {*} tableName 
     * @param {*} columns 
     * @param {*} where 
     */
    async select(tableName, columns, where) {
        if (where) {
            var whereKey = 'ruangId'
            var whereValue = where[whereKey]
            return await SQLiteManager.select(tableName, ((columns || columns === "") ? "*" : columns), whereKey + " = ?", [where])
        }
        else {
            return await SQLiteManager.select(tableName, ((columns || columns === "") ? "*" : columns))
        }
    }

    /**
     * 
     * @param {*} tableName 
     * @param {*} data 
     */
    insert(tableName, data) {
        var keys = Object.keys(data)
        var values = keys.map((key) => data[key])
        SQLiteManager.insert(tableName, keys, values)
    }

    /**
     * 
     * @param {*} tableName 
     * @param {*} data 
     * @param {*} where 
     */
    update(tableName, data, where) {
        console.log(data)
        var keys = Object.keys(data)
        var values = keys.map((key) => data[key])

        var whereKey = 'ruangId'
        // var whereValue = where[whereKey]

        SQLiteManager.update(tableName, keys, values, whereKey + " = ?", [where])
    }

    /**
     * 
     * @param {*} tableName 
     * @param {*} where 
     */
    delete(tableName, where) {
        var whereKey = 'ruangId'
        // var whereValue = where[whereKey]

        SQLiteManager.delete(tableName, whereKey + " = ?", [where])
    }

    /**
     * 
     * @param {*} query 
     */
    executeSQL(query) {
        SQLiteManager.query(query)
    }

    /**
     * 
     * @param {*} tableName 
     * @param {*} columns 
     */
    createTable(tableName, columns) {
        var query = "";
        for (var i = 0; i < columns.length; i++) {
            if (i === columns.length - 1) {
                query += '"' + columns[i].name + '" ' + columns[i].dataType + ' ' + ((columns[i].isNotNull) ? "NOT NULL " : "") + columns[i].options
            } else {
                query += '"' + columns[i].name + '" ' + columns[i].dataType + ' ' + ((columns[i].isNotNull) ? "NOT NULL " : "") + columns[i].options + ','
            }
        }
        this.executeSQL("CREATE TABLE IF NOT EXISTS " + tableName + ' (' + query + ')')
    }
}