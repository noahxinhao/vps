#!/usr/bin/expect
spawn ssh ubuntu@172.16.8.182
set timeout 300
expect "ubuntu@172.16.8.182's password: "
send "NX6CrXNnWzQE\n"
expect "ubuntu@ubuntu:~$ "
send "sudo /opt/apache-tomcat-7.0.42/bin/shutdown.sh\n"
expect "\\\[sudo\\\] password for ubuntu: "
send "NX6CrXNnWzQE\n"
expect "ubuntu@ubuntu:~$ "
send "exit\n"