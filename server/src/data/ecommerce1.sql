-- users 1 - n orders(pedidos)
-- users 1 - n cartoes
-- users 1 - n enderecos
-- users 1 - n creditos
-- users 1 - 1 email
-- users 1 - 1 senha

-- Apagar o banco de dados se o banco de dados existir
DROP DATABASE IF EXISTS ecommerce;
-- Cria banco de dados
CREATE DATABASE ecommerce;

-- Seleciona banco de  dados para uso
USE ecommerce;



-- Cria tabela de usuário
CREATE TABLE users (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
cpf VARCHAR(50) NOT NULL,
celular VARCHAR(50) NOT NULL,
nascimento DATE,
email VARCHAR(100) NOT NULL,
is_admin TINYINT DEFAULT 0,
senha VARCHAR(200) ,
sexo VARCHAR(3),
rg VARCHAR(50),
telefone VARCHAR(50),
receber VARCHAR(3),
instagram VARCHAR (100),
created_at DATETIME,
modified_at DATETIME
);

INSERT INTO users (nome,cpf,celular,nascimento,email,senha,sexo,rg ,telefone,receber,instagram,created_at,modified_at)
VALUES
("Paulo Oliveira","546.546.546-54","45 99978-4585", "1999-12-20","robertinho123@email.com","123", "M","123456-SSP/RJ", "78 9999-85454","s","rb","2022-09-12","2022-09-12"),
("Ana Couto","123.456.456-45","71 9999-85454","1999-11-10","aninha123@email.com","123","F","123456-SSP/RJ","71 9999-85454","s","aninha123","2022-09-12","2022-09-12" ),
("Juliana Rios","123.456.879-56","54 99985-4525","1978-05-05","ju123@email.com","123","F","123456-SSP/SP","54 99985-4525","n",NULL, "2022-09-12","2022-09-12"),
("João Oliveira","123.456.879-85","54 99985-4500","1974-02-05","joaozinho123@email.com","123", "M","123456-SSP/MS","54 99985-4500","sim","joao123", "2022-09-12","2022-09-12"),
("Marcos Souza","123.456.579-85","14 99915-2520","2006-03-05","marquinhos123@email.com","123","M",NULL,NULL,"n","marquinho","2020-09-12","2022-09-12");

SELECT DATE_FORMAT(nascimento, "%d/%m/%y")
FROM users;

SELECT * FROM users;

DROP TABLE IF EXISTS emailsenha;
CREATE TABLE emailsenha (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
novoemail VARCHAR(100) NOT NULL,
confirmeemail VARCHAR(100) NOT NULL,
novasenha VARCHAR(200) ,
confirmesenha VARCHAR(200),
created_at DATETIME,
modified_at DATETIME,
user_id INT UNSIGNED
);

INSERT INTO emailsenha (novoemail,confirmeemail,novasenha,confirmesenha,created_at,modified_at,user_id)
VALUES
("robertinho123@email.com.br","robertinho123@email.com.br","134","134","2022-09-12","2022-09-12",1);

SELECT * FROM emailsenha;

CREATE TABLE images(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
path VARCHAR(50) NOT NULL,
size INT UNSIGNED,
extension VARCHAR(10),
created_at DATETIME,
modified_at DATETIME,
user_id INT UNSIGNED
);
INSERT INTO images (path, size, extension, created_at, modified_at,user_id)
VALUES
("ebb55c5e6e.jpg","8642","jpg","2022-09-12","2022-09-12",1);

SELECT * FROM images;


DROP TABLE IF EXISTS enderecos;

CREATE TABLE enderecos (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
rua VARCHAR(100) NOT NULL,
bairro VARCHAR(100) NOT NULL, 
numero VARCHAR(100) NOT NULL,
cidade VARCHAR(100) NOT NULL,
cep INT NOT NULL ,
complemento VARCHAR(50),
created_at DATETIME,
user_id INT UNSIGNED,
-- ligação de chave estrangeira 
FOREIGN KEY (user_id) REFERENCES users(id) 
);

INSERT INTO enderecos (rua,bairro,numero,cidade,cep,created_at,user_id)
VALUES
("Manoel Dias da Silva","Pojuca","500","Monte Verde / MG","45897654","2022-09-12",1),
("Dias da Silva","Piripiri","S/N","Verde/BA","45897154","2022-09-12",2),
("Dias da Silva","Piripiri","045","Verde/MG","85897654","2022-09-12",3),
("Pariaba da Silva","Piripiri","30","Brasilha","35897654","2022-09-12",4),
("Silva","Piripiri","004","Verde/RS","15897654","2022-09-12",1),
("Dias da Silva","Piuba", "450","Manaus","45895654","2022-09-12",1),
("Dias da Silva","Piripiri","450","Verde/RS","25897654","2022-09-12",2),
("Silva Paraiba","Morro", "200","Verde/RS","24897654","2022-09-12",3),
("Pernanbuco","Santos","450","Verde/RS","45897654","2022-09-12",2);

-- SELECT CONCAT(rua,", ", bairro  , ",", numero) FROM enderecos;

SELECT * FROM enderecos;


-- quantidade de pedidos por usuario id
SELECT u.id AS id,
u.nome AS nome,
COUNT(u.id) AS "Quantidade de Endereços Usuário"
FROM users AS u
INNER JOIN enderecos AS e ON u.id = e.user_id
GROUP BY u.id;



DROP TABLE IF EXISTS cartoes;
CREATE TABLE cartoes (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR(100) NOT NULL,
numero VARCHAR(50) NOT NULL,
cvc DECIMAL(3) NOT NULL,
data DATE ,
cpf VARCHAR(50) NOT NULL,
telefone VARCHAR(50),
created_at DATETIME,
modified_at DATETIME,
user_id INT UNSIGNED,

-- ligação de chave estrangeira 
FOREIGN KEY (user_id) REFERENCES users(id) 
);

INSERT INTO cartoes (nome,numero,cvc,data,cpf, telefone, created_at, modified_at, user_id)
VALUES
("Paulo Oliveira","4546 4654 2138 0545","454", "2025-05-08", "546.546.546-54","78 9999-85454","2022-09-12","2022-09-12",1),
("Antonio","4546 4656 2145 0545","451", "2035-05-18","123.456.456-45","78 9999-85454","2022-09-12","2022-09-12",2),
("Pedro Matos","4546 4656 2145 0545","471", "2025-10-08","123.456.879-56",null,"2022-09-12","2022-09-12",3),
("Paulo Oliveira","1246 4656 2145 0545","151", "2025-05-28","546.546.546-54","78 9999-85454","2022-09-12","2022-09-12",1);

SELECT * FROM cartoes;

SELECT DATE_FORMAT(data, "%m/%y")
FROM cartoes;
-- quantidade de pedidos por usuario id
SELECT u.id AS id,
u.nome AS nome,
COUNT(u.id) AS "Quantidade de Cartões Usuário"
FROM users AS u
INNER JOIN cartoes AS c ON u.id = c.user_id
GROUP BY u.id;


DROP TABLE IF EXISTS orders;

CREATE TABLE orders(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
codigo VARCHAR (20),
-- data que foi criado o pedido
status ENUM("processando", "a caminho" ,"entregue") DEFAULT "processando",
data DATE,
created_at DATETIME NOT NULL,
preco DECIMAL(10,2) NOT NULL,
formaPagamento VARCHAR(50) NOT NULL,
user_id INT UNSIGNED,
enderecos_id INT UNSIGNED,
-- ligação de chave estrangeira 
FOREIGN KEY (enderecos_id) REFERENCES enderecos(id), 
FOREIGN KEY (user_id) REFERENCES users(id) 
);

INSERT INTO orders (codigo,status,data,created_at,preco,formaPagamento,user_id,enderecos_id)
VALUES
("4546","a caminho", "2021-05-08","2022-09-12","300,00", "cartão de Credito",1,1),
("2145 ","processando", "2021-05-08","2022-09-08","30,00","cartão de Credito",2,2),
("0145","entregue", "2021-05-08","2021-10-08","150,00","boleto",3,1),
("1246 ","entregue", "2021-05-08","2021-05-28","250,00","pix",4,4),
("4510","entregue", "2021-05-08","2021-09-08","350,00","cartão de Credito",1,4),
("4542","entregue", "2021-05-08","2020-05-08", "500,00","cartão de Credito",1,4),
("2145","entregue", "2021-05-08","2020-04-18","800,00","boleto",2,1),
("4532", "entregue", "2021-05-08","2019-05-30","490,00","boleto",2,2),
("0002", "entregue", "2021-05-08","2019-02-25","100,00","pix",3,3);


SELECT * FROM orders;
SELECT preco FROM orders;
SELECT preco FROM users INNER JOIN orders ON users.id =orders.user_id;
SELECT id, SUM(preco) AS "VALOR"  FROM orders;
-- retorna a quantidade de linha
SELECT COUNT(id) AS "Pedidos" FROM orders;


-- quantidade de pedidos por usuario id
SELECT u.id AS id,
u.nome AS nome,
COUNT(u.id) AS "Quantidade de Pedidos"
FROM users AS u
INNER JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id;

SELECT u.id AS id, u.nome AS nome FROM users AS u
INNER JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id;

SELECT DATE_FORMAT(created_at, "%d/%m/%y")
FROM orders;

DROP TABLE IF EXISTS creditos;
CREATE TABLE creditos (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
created_at DATE NOT NULL,
historico varchar(50) NOT NULL,
tipodelancamento varchar(100), 
preco DECIMAL(10,2) NOT NULL,
user_id INT UNSIGNED,
-- ligação de chave estrangeira 
FOREIGN KEY (user_id) REFERENCES users(id) 
);

INSERT INTO creditos (created_at,historico,tipodelancamento,preco,user_id)
VALUES
("2022-09-12","2145", "camisa","300,00",1 ),
("2022-09-12","2145", "camisa","300,00",1 );

SELECT * FROM creditos;
SELECT SUM(preco) AS "VALOR" FROM creditos;

-- usuarios concatenando com endereco
SELECT * FROM users INNER JOIN enderecos ON users.id =enderecos.user_id;

SELECT * FROM enderecos INNER JOIN users ON enderecos.id =enderecos.user_id;
-- usuarios concatenando com cartao
 SELECT * FROM users INNER JOIN cartoes ON users.id =cartoes.user_id;
-- usuarios concatenando com pedidos
SELECT * FROM users INNER JOIN orders ON users.id =orders.user_id;
