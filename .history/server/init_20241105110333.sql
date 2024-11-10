create table task(
  id serial primary key,
  description varchar(255) not null
)

insert into task (description) values ('Learn SQL');
insert into task (description) values ('Learn Java');