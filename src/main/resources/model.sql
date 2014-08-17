drop table if exists sys_user
create table sys_user
(
  id varchar(32),
  user_id varchar(45) not null ,
  password varchar(64) not null ,
  account varchar(30) unique not null ,
  real_name varchar(30) not null ,
  status int(11) DEFAULT 1,
  update_time timestamp,
  phone char(13),
  email char(60),
  user_img_path varchar(45),
  create_time timestamp,
  info varchar(45),
  primary key (id)
);

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `info` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `user_role` (
  `id` varchar(38) DEFAULT NULL,
  `user_id` varchar(38) DEFAULT NULL,
  `role_name` varchar(38) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;