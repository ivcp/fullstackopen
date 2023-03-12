CREATE TABLE blogs (
 id SERIAL PRIMARY KEY,
 author VARCHAR(255),
 url text NOT NULL,
 title VARCHAR(255) NOT NULL,
 likes INTEGER DEFAULT 0);

INSERT INTO blogs (author, url, title) VALUES ('Michael Chan', 'https://reactpatterns.com/', 'React Patterns');
INSERT INTO blogs (author, url, title) VALUES ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 'Type Wars');
