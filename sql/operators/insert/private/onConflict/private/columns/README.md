# values Helper
Specifies the columns Array Helper for the `ON CONFLICT` clause.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-insert.html#SQL-ON-CONFLICT)

# Allowed Types and Usage

## as Array:

The Usage of `values` as **Array** is restricted to childs have the following Type:

- String

## as Array :arrow_right: String:

Usage of `values` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$values: [
    <String> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            staff_no: 1,
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $onConflict: {
            $columns: ['staff_no', 'last_name'],
            $doNothing: true
        }
    });
}

// SQL output
INSERT INTO
    people (staff_no, first_name, last_name, age)
VALUES
    ($1, $2, $3, $4) ON CONFLICT (staff_no, last_name) DO NOTHING

// Values
{
    "$1": 1,
    "$2": "John",
    "$3": "Doe",
    "$4": 40
}
```