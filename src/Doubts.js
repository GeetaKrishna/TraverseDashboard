/**
 * 
 * 1. Patient BP getting overwritten
 * 2. Glucose level not getting added , face an issue like this
    {{   could not execute statement; SQL [n/a]; constraint ["PRIMARY KEY ON PUBLIC.FCHEALTH_GL(ID) [0, TIMESTAMP '2019-10-07 16:41:49.566', 122, 1]"; SQL statement:
        insert into fchealth_gl (gl_date, gl, pid, id) values (?, ?, ?, ?) [23505-199]]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement
    }}
 *  3. BLoodPressure Graph Data (Average) 
 *  4. color coding for weight display or is it BMI we are talking about.
 *  5. For Changing the Up and Down Arrows in cards, we need time(to compare and set it) in order to change the direction
 */ 