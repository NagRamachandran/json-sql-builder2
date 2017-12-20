'use strict';

class add extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Number: { syntax: this.Syntax('+ <value-param>') }
		});
	}
}

module.exports = {
	definition: add,
	description: `Specifies the \`+\` Operator as Helper.`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/arithmetic-functions.html#operator_plus',
		MariaDB: 'https://mariadb.com/kb/en/library/addition-operator/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-math.html',
		SQLite: 'https://sqlite.org/lang_expr.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/operators002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/language-elements/arithmetic-operators-transact-sql'
	},
	examples: {
		Number: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$select({
							max_age: { $: { $max: 'age', $add: 1 } },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT MAX(age) + $1 AS max_age FROM people',
						values:{
							$1: 1
						}
					}
				}
			}
		}
	}
}