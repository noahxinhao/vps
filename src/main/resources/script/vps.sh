#!/usr/bin/expect
cd /home/noah/noah/work/amazon/vps
git add -A
git commit -m "noah"
git push origin develop
set timeout 300
expect  "Username for 'https://github.com':"
send "870708429@qq.com"
expect "Password for 'https://870708429@qq.com@github.com': "
send "itlxh784533"
ssh ubuntu@54.64.18.35 "sudo /opt/script/deploy.sh"