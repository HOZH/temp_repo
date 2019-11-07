create database hw8;

use hw8;

create table assists(
  player VARBINARY(255),
  club varchar(255),
  pos varchar(255),
  gp int,
  gs int,
  a int,
  gwa int,
  hma int,
  rda int,
  a90min decimal,
  primary key (player)
);

LOAD DATA LOCAL INFILE '/home/ubuntu/hw8/assists.csv'
INTO TABLE assists
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
