# org.fsc.biznet



Please note: These commands will kill and remove all running containers, and should remove all previously created Hyperledger Fabric chaincode images.
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)

Before development session -
cd ~/fabric-tools
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh


At the end of your development session
cd ~/fabric-tools
./stopFabric.sh
./teardownFabric.sh



1. Creating a business network :- $ yo hyperledger-composer:businessnetwork
2. Write all the cto (model), js (transaction logic), acl (access control rules) files to define the network
3. Generate a business network archive (.bna file)  :-  $ composer archive create -t dir -n .          =>which generate supply-chain@0.0.1.bna file
4. Deploying business network to the instance of Hyperledger Fabric,  information from the Fabric administrator is required to create a PeerAdmin identity, with privileges to 	   deploy chaincode to the peer. 
   Deploying a business network to the Hyperledger Fabric requires the Hyperledger Composer chaincode to be installed on the peer, then the business network archive (.bna) must be sent to the peer, and a new participant, identity, and associated card must be created to be the network administrator. Finally, the network administrator business network card must be imported for use, and the network can then be pinged to check it is responding. :-
   a.	To install the composer runtime, run the following command: $ composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName supply-chain
   b.	To deploy the business network. :-  $ composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile supply-chain@0.0.1.bna --file networkadmin.card         => this will create a file called networkadmin.card from the .bna file
   c.	To import the network administrator identity as a usable business network card, run the following command: $  composer card import --file networkadmin.card
   d.	To check that the business network has been deployed successfully :- $  composer network ping --card admin@supply-chain
5. To create the REST API :-  $ composer-rest-server    enter => admin@supply-chain , then select => never use namespaces, then select no, when asked to generate secure api, 		select Yes when asked whether to enable event publication and then Select No when asked whether to enable TLS security.

			!!!!!!!!!!!!!!!!!!!!!!!!!!!The generated API is connected to the deployed blockchain and business network.!!!!!!!!!!!!!!!!!!!!!!!!!!!!



