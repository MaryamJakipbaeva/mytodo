create table task(
  id serial primary key,
  description varchar(255) not null
)

insert into task (description) values ('My test taskl');
insert into task (description) values ('Learn Java');