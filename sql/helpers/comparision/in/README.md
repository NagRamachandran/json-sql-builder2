# in Helper
Specifies the comparision `IN` Operator as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/comparison-operators.html#function_in)
- [MariaDB](https://mariadb.com/kb/en/library/in/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-comparisons.html)
- [SQLite](https://sqlite.org/lang_expr.html#in_op)
- [Oracle](https://docs.oracle.com/html/A95915_01/sqopr.htm#sthref149)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/language-elements/in-transact-sql)

# Allowed Types and Usage

## as Array:

Usage of `in` as **Array** with the following Syntax:

**Syntax:**

```javascript
$in: [ ... ]
```

**SQL-Definition:**
```javascript
IN (<value-param>[ , ... ])
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: { $in: ['John', 'Jane', 'Joe'] }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name IN ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Jane",
    "$3": "Joe"
}
```

## as Object:

Usage of `in` as **Object** with the following Syntax:

**Syntax:**

```javascript
$in: { ... }
```

**SQL-Definition:**
```javascript
IN (<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                people_id: {
                    $in: {
                        $select: {
                            people_id: 1,
                            $from: 'people_skills',
                            $where: {
                                skill_points: { $gt: 100 }
                            }
                        }
                    }
                }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    people_id IN (
        SELECT
            people_id
        FROM
            people_skills
        WHERE
            skill_points > $1
    )

// Values
{
    "$1": 100
}
```

## as Function:

Usage of `in` as **Function** with the following Syntax:

**Syntax:**

```javascript
$in: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
IN (<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                people_id: {
                    $in: sql.select('people_id', {
                        $from: 'people_skills',
                        $where: {
                            skill_points: { $gt: 100 }
                        }
                    })
                }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    people_id IN (
        SELECT
            people_id
        FROM
            people_skills
        WHERE
            skill_points > $1
    )

// Values
{
    "$1": 100
}
```

## Further Examples

:bulb: **Usage as SQL-Function**
```javascript
function() {
    let averageAge = 45;

    return sql.build({
        $select: {
            $from: 'people',
            $where: {
                first_name: sql.in(['John', 'Jane', 'Joe'])
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    first_name IN ($1, $2, $3)

// Values
{
    "$1": "John",
    "$2": "Jane",
    "$3": "Joe"
}
```

