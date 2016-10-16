--create tasks table

CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
task varchar(80) NOT NULL,
complete varchar(80) NOT NULL
);

--add in boolean completion column
ALTER TABLE tasks
ADD COLUMN markedcomplete boolean

--i then went back into postico later and deleted the "complete" column because it was varchar and i wanted a boolean one
