import digitalocean
import time
import os
import requests

#Sempre rodar do diretorio principal do repo da LaPag (dar cd antes, se for python /Users/... etc nao funciona)

#IPs dos Droplets do site estatico e do portal
siteIP = "162.243.57.13"
productionIP = "107.170.100.189"

#Caso mude algum servidor, util para pegar os IDs
manager = digitalocean.Manager(token="9972f0edf3b7130d966aae4e42f126dcf05f6b008df4fd4985b4fded71446436")
my_droplets = manager.get_all_droplets()
print("Droplets:")
print(my_droplets)

print("Iniciando deploy! Sit back, relax and enjoy!")

#Token nunca muda, mas caso o floating IP mude precisa atualizar
floatingIp = digitalocean.FloatingIP.get_object(api_token="9972f0edf3b7130d966aae4e42f126dcf05f6b008df4fd4985b4fded71446436",ip="159.203.152.84")
print(os.getcwd())
os.system("eval $(ssh-agent) && ssh-add ~/.ssh/id_rsa && cd .deploy-site && mup deploy")
print("Esperando...")
time.sleep(30)
r = requests.get('http://'+siteIP+':3000')
if (r.status_code == 200):
    print("Deploy realizado no Droplet intermediario com sucesso!")
    # ID do Droplet do site estatico (que serve como intermediario)
    floatingIp.assign(53047264)
    print("IP Atualizado para o Droplet intermediario!")
    time.sleep(60)
    os.system("eval $(ssh-agent) && ssh-add ~/.ssh/id_rsa && cd .deploy-production && mup deploy --cached-build")
    print("Esperando...")
    time.sleep(30)
    a = requests.get('http://'+productionIP)
    if (a.status_code == 200):
        print("Deploy realizado no Droplet principal com sucesso!")
        #ID do Droplet principal do portal
        floatingIp.assign(47863233)
        print("IP retornou para o Droplet principal!")
    else:
        print("Request para o IP " + productionIP + "falhou. Favor acessar o IP e verificar. Deploy foi encerrado por seguranca.")
else:
    print("Request para o IP " + siteIP + "falhou. Favor acessar o IP e verificar. Deploy foi encerrado por seguranca.")
