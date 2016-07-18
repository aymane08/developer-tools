
import Ember from 'ember';
//http://www.programwitherik.com/ember-services-tutorial/
export default Ember.Service.extend({
    socketService: Ember.inject.service('websockets'),
    purecloud: Ember.inject.service(),
    analyticsService: Ember.inject.service(),

    queues: [],

    init() {
        this._super(...arguments);

        let self = this;
        let pureCloudSession = this.get("purecloud").get("session");

        let routingApi = self.get("purecloud").routingApi();

        let queues = [];
        function processPageOfQueues(results){
            for(var x=0; x< results.entities.length; x++){
                queues.push(results.entities[x]);
            }

            if(results.nextUri){
                //get the next page of users directly
                pureCloudSession.get(results.nextUri).then(processPageOfQueues);
            }else{
                self.set("queues", queues);
            }

        }
        routingApi.getQueues(25,0,'name', null, true).then(processPageOfQueues);
    }
});
