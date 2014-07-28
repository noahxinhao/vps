create table sys_user
(
  id int,
  user_id varchar(45),
  password varchar(64),
  real_name varchar(30),
  status int,
  update_time timestamp,
  phone char(13),
  email char(60),
  user_img_path varchar(45),
  create_date timestamp,
  primary key (id)
);