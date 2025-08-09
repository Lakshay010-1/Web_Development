create DATABASE eisenhower_matrix;			-- (Database name is user-replaceable)

CREATE TABLE spaces(
	id SERIAL PRIMARY KEY,
	space TEXT UNIQUE	
);

CREATE TABLE tasks(
	id BIGINT PRIMARY KEY,
	title TEXT,
	dueDate TIMESTAMP,
	priority VARCHAR(4),
	space_id INTEGER REFERENCES spaces(id)
);

CREATE TABLE ui_state(
	id INTEGER PRIMARY KEY,
	isGrid BOOLEAN, 
	isLightTheme BOOLEAN,
	currentSpace TEXT
);

INSERT INTO spaces (space) values ('Primary');
INSERT INTO ui_state values (1,true,true,'Primary');

SELECT tasks.id,title,dueDate,priority,spaces.space FROM spaces JOIN tasks ON spaces.id = tasks.space_id;