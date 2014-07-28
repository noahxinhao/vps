#!/usr/bin/expect
spawn ssh ubuntu@172.16.8.182
set timeout 300
expect "ubuntu@172.16.8.182's password: "
send "NX6CrXNnWzQE\n"
expect "ubuntu@ubuntu:~$ "
send "sudo rm -fr /opt/apache-tomcat-7.0.42/webapps/ROOT/*\n"
expect "\\\[sudo\\\] password for ubuntu: "
send "NX6CrXNnWzQE\n"
expect "ubuntu@ubuntu:~$ "
send "exit\n"