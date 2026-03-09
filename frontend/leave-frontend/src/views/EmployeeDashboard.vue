<template>
<div class="min-h-screen bg-gray-100">

<!-- HEADER -->

<div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow flex justify-between items-center">
<div>
<h1 class="text-3xl font-bold">Leave Management System</h1>
<p class="text-sm opacity-80">Employee Dashboard</p>
<p class="text-sm mt-1">Logged in as: <b>{{ userName }}</b></p>
</div>

<button
@click="logout"
class="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
Logout
</button>
</div>


<div class="p-10">

<!-- Welcome -->

<div class="bg-white shadow rounded-xl p-6 mb-8 flex justify-between items-center">
<div>
<h2 class="text-xl font-semibold text-gray-800">
👋 Welcome back, {{ userName }}!
</h2>
<p class="text-gray-500 text-sm">Here is your leave summary for today.</p>
</div>

<div class="text-sm text-gray-500">
{{ new Date().toLocaleDateString() }}
</div>
</div>


<!-- Stats -->

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

<div class="bg-white shadow rounded-xl p-5">
<p class="text-gray-500 text-sm">Total Leaves</p>
<p class="text-2xl font-bold text-blue-600">{{ leaves.length }}</p>
</div>

<div class="bg-white shadow rounded-xl p-5">
<p class="text-gray-500 text-sm">Approved</p>
<p class="text-2xl font-bold text-green-600">{{ approvedCount }}</p>
</div>

<div class="bg-white shadow rounded-xl p-5">
<p class="text-gray-500 text-sm">Pending</p>
<p class="text-2xl font-bold text-yellow-600">{{ pendingCount }}</p>
</div>

</div>


<div class="grid grid-cols-1 md:grid-cols-2 gap-8">

<!-- LEFT COLUMN -->

<div>

<!-- PROFILE -->

<div class="bg-white rounded-xl shadow-lg p-6 mb-6 border">
<h2 class="text-xl font-semibold text-gray-700 mb-4">👤 Employee Profile</h2>

<p><b>Name:</b> {{ userName }}</p>
<p><b>Employee ID:</b> {{ employeeId }}</p>

</div>


<!-- LEAVE BALANCE -->

<div class="bg-white rounded-xl shadow-lg p-6 border">

<h2 class="text-xl font-semibold text-gray-700 mb-4">
📊 Leave Balance (Per Year)
</h2>

<div class="space-y-4">

<div>
<div class="flex justify-between text-sm font-medium">
<span>Annual Leave</span>
<span>{{ annualRemaining }} / {{ leavePolicy.annual }}</span>
</div>
<div class="w-full bg-gray-200 rounded-full h-2 mt-1">
<div class="bg-blue-600 h-2 rounded-full"
:style="{width:(annualRemaining/leavePolicy.annual)*100 + '%'}">
</div>
</div>
</div>

<div>
<div class="flex justify-between text-sm font-medium">
<span>Sick Leave</span>
<span>{{ sickRemaining }} / {{ leavePolicy.sick }}</span>
</div>
<div class="w-full bg-gray-200 rounded-full h-2 mt-1">
<div class="bg-green-500 h-2 rounded-full"
:style="{width:(sickRemaining/leavePolicy.sick)*100 + '%'}">
</div>
</div>
</div>

<div>
<div class="flex justify-between text-sm font-medium">
<span>Casual Leave</span>
<span>{{ casualRemaining }} / {{ leavePolicy.casual }}</span>
</div>
<div class="w-full bg-gray-200 rounded-full h-2 mt-1">
<div class="bg-yellow-500 h-2 rounded-full"
:style="{width:(casualRemaining/leavePolicy.casual)*100 + '%'}">
</div>
</div>
</div>

<div>
<div class="flex justify-between text-sm font-medium">
<span>Emergency Leave</span>
<span>{{ emergencyRemaining }} / {{ leavePolicy.emergency }}</span>
</div>
<div class="w-full bg-gray-200 rounded-full h-2 mt-1">
<div class="bg-red-500 h-2 rounded-full"
:style="{width:(emergencyRemaining/leavePolicy.emergency)*100 + '%'}">
</div>
</div>
</div>

</div>
</div>

</div>


<!-- RIGHT COLUMN -->

<div class="bg-white rounded-xl shadow-lg p-6">

<h2 class="text-xl font-semibold mb-6 text-gray-700">Apply Leave</h2>

<div class="space-y-4">

<select v-model="leaveType" class="w-full border p-2 rounded">
<option value="">Select Leave Type</option>
<option value="Annual Leave">Annual Leave</option>
<option value="Sick Leave">Sick Leave</option>
<option value="Casual Leave">Casual Leave</option>
<option value="Emergency Leave">Emergency Leave</option>
</select>

<input
v-model="startDate"
type="date"
:min="today"
class="w-full border p-2 rounded"
/>

<input
v-model="endDate"
type="date"
:min="startDate || today"
class="w-full border p-2 rounded"
/>

<input
v-model="reason"
placeholder="Reason"
class="w-full border p-2 rounded"
/>

<button
@click="applyLeave"
class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
Apply Leave
</button>

</div>

</div>

</div>


<!-- ACTIVITY -->

<div class="bg-white rounded-xl shadow-lg p-6 mt-8">

<h2 class="text-xl font-semibold mb-6 text-gray-700">
Recent Leave Activity
</h2>

<div
v-for="leave in leaves"
:key="leave._id"
class="border-b py-3 flex justify-between items-center">

<div>
<p class="font-semibold">{{ leave.leaveType }}</p>
<p class="text-sm text-gray-500">
{{ new Date(leave.startDate).toLocaleDateString() }} -
{{ new Date(leave.endDate).toLocaleDateString() }}
</p>
</div>

<div>

<span v-if="leave.status==='Pending'"
class="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
Pending
</span>

<span v-if="leave.status==='Approved'"
class="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
Approved
</span>

<span v-if="leave.status==='Rejected'"
class="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm">
Rejected
</span>

</div>

</div>

</div>

</div>

</div>
</template>


<script>
import axios from "axios"

export default {

data(){
return{
leaveType:"",
startDate:"",
endDate:"",
reason:"",
leaves:[],
employeeId:"",
userName:"",
today:new Date().toISOString().split("T")[0],

leavePolicy:{
annual:20,
sick:12,
casual:6,
emergency:3
}
}
},

async mounted(){
this.loadLeaves()
},

computed:{

approvedCount(){
return this.leaves.filter(l=>l.status==="Approved").length
},

pendingCount(){
return this.leaves.filter(l=>l.status==="Pending").length
},

annualRemaining(){
return Math.max(this.leavePolicy.annual - this.calculateUsed("Annual Leave"),0)
},

sickRemaining(){
return Math.max(this.leavePolicy.sick - this.calculateUsed("Sick Leave"),0)
},

casualRemaining(){
return Math.max(this.leavePolicy.casual - this.calculateUsed("Casual Leave"),0)
},

emergencyRemaining(){
return Math.max(this.leavePolicy.emergency - this.calculateUsed("Emergency Leave"),0)
}

},

methods:{

calculateDays(start,end){
const s=new Date(start)
const e=new Date(end)
return Math.ceil((e-s)/(1000*60*60*24))+1
},

calculateUsed(type){
return this.leaves
.filter(l=>l.status==="Approved" && l.leaveType===type)
.reduce((t,l)=>t+this.calculateDays(l.startDate,l.endDate),0)
},

async loadLeaves(){

this.employeeId=localStorage.getItem("employeeId")
this.userName=localStorage.getItem("userName")

const res=await axios.get(
`http://localhost:5000/api/leave/employee/${this.employeeId}`
)

this.leaves=res.data
},

async applyLeave(){

if(!this.leaveType){
alert("Please select leave type")
return
}

if(!this.startDate || !this.endDate){
alert("Please select leave dates")
return
}

if(!this.reason){
alert("Please enter reason")
return
}

const days=this.calculateDays(this.startDate,this.endDate)

if(this.leaveType==="Annual Leave" && days>this.annualRemaining){
alert(`Leave Limit Exceeded Cannot Apply`)
return
}

if(this.leaveType==="Sick Leave" && days>this.sickRemaining){
alert(`Leave Limit Exceeded Cannot Apply`)
return
}

if(this.leaveType==="Casual Leave" && days>this.casualRemaining){
alert(`Leave Limit Exceeded Cannot Apply`)
return
}

if(this.leaveType==="Emergency Leave" && days>this.emergencyRemaining){
alert(`Leave Limit Exceeded Cannot Apply `)
return
}

await axios.post("http://localhost:5000/api/leave/apply",{
employeeId:this.employeeId,
employeeName:this.userName,
leaveType:this.leaveType,
startDate:this.startDate,
endDate:this.endDate,
reason:this.reason
})

alert("Leave Applied Successfully")

this.leaveType=""
this.startDate=""
this.endDate=""
this.reason=""

this.loadLeaves()

},

logout(){
localStorage.clear()
this.$router.push("/")
}

}

}
</script>