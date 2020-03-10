create table album (
    id serial primary key,
    name varchar,
    band varchar,
    category varchar
);

create table users (
    id serial primary key,
    name varchar,
    email varchar
);

create table review (
    id serial primary key,
    users_id int,
    FOREIGN KEY(users_id) REFERENCES users (id),
    title varchar,
    review varchar,
    album_id int,
    FOREIGN KEY(album_id) REFERENCES album (id)
);
-- inserting albums into the albums table
INSERT INTO album (name, band, category)
VALUES ('A Night at the Opera', 'Queen', 'Rock'),
('Mothership', 'Led Zepplin', 'Rock'),
('Waiting for the Sun', 'The Doors', 'Rock'),
('Rumours', 'Fleetwood Mac', 'Rock'),
('Aftermath', 'The Rolling Stones', 'Rock'),
('If You Can Believe Your Eyes and Ears', 'The Mommas and the Pappas', 'Rock'),
('The Dark Side of the Moon', 'Pink Floyd', 'Rock');

-- inserting users into the user table
INSERT INTO users (name, email)
VALUES ('James Morrison', 'james@gmail.com'),
('Bob Plant', 'bplant@gmail.com'),
('James Hendrix', 'jhendrix@gmail.com'),
('Michael Jagger', 'mjagger@gmail.com');

--inserting reviews into the review table
INSERT INTO review (users_id, title, review, album_id)
VALUES (1, 'My Review', 'I love this album!!', 3),
(2, 'Stairway to Nowhere', 'Rubbish', 2),
(3, 'Hendrix Reviewing Aftermath', 'Pretty Colors', 5),
(4, 'Jagger Loves Queen', 'This is the album of the decade', 1),
(1, 'Synopsis on Mothership', 'I cannot find my shirt. I have to go to the bathroom', 2);

