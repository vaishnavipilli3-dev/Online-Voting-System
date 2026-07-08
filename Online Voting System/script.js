// STORAGE
let users = JSON.parse(localStorage.getItem("users")) || [];
let votes = JSON.parse(localStorage.getItem("votes")) || {A:0,B:0,C:0};

let currentUser = null;
let generatedOTP = "";

// ADMIN LIST
const adminUsers = ["lalavali_shaik","sowmya_mandula","sai_teja","chandhana_vaishnavi"];
const adminPassword = "lsscsmtv.sreyas";

// NAVIGATION
function show(id){
  document.querySelectorAll('.container').forEach(c=>c.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ADMIN LOGIN
function adminLogin(){
  let user = adminUser.value.trim().toLowerCase();
  let pass = adminPass.value;

  if(adminUsers.includes(user) && pass === adminPassword){
    document.getElementById("adminWelcome").innerText = "Welcome Admin: " + user;
    show('adminPanel');
  } else {
    alert("Access denied! Only authorized admins allowed.");
  }
}

// RESET VOTES
function resetVotes(){
  votes = {A:0,B:0,C:0};
  localStorage.setItem("votes",JSON.stringify(votes));

  users.forEach(u=>u.voted=false);
  localStorage.setItem("users",JSON.stringify(users));

  alert("All votes reset!");
}

// REGISTER
function register(){
  let name = rname.value;
  let email = remail.value;
  let pass = rpass.value;

  let exists = users.find(u=>u.email===email);
  if(exists){
    alert("User already exists!");
    return;
  }

  users.push({name,email,pass,voted:false});
  localStorage.setItem("users",JSON.stringify(users));

  alert("Registered Successfully!");
  show('login');
}

// LOGIN
function login(){
  let email = lemail.value;
  let pass = lpass.value;

  let user = users.find(u=>u.email===email && u.pass===pass);
  if(!user){
    alert("Invalid credentials!");
    return;
  }

  currentUser = user;

  generatedOTP = Math.floor(1000 + Math.random()*9000);
  otpText.innerText = "Your OTP is: " + generatedOTP;

  show('otp');
}

// VERIFY OTP
function verifyOTP(){
  if(otpInput.value == generatedOTP){
    if(currentUser.voted){
      alert("You already voted!");
      show('home');
    } else {
      show('vote');
    }
  } else {
    alert("Wrong OTP!");
  }
}

// VOTE
function submitVote(){
  let selected = document.querySelector('input[name="cand"]:checked');

  if(!selected){
    alert("Select a candidate!");
    return;
  }

  votes[selected.value]++;
  localStorage.setItem("votes",JSON.stringify(votes));

  let index = users.findIndex(u=>u.email===currentUser.email);
  users[index].voted = true;
  localStorage.setItem("users",JSON.stringify(users));

  alert("Vote submitted successfully!");
  showResults();
}

// RESULTS
function showResults(){
  resultData.innerHTML =
    "Candidate A: " + votes.A + "<br>" +
    "Candidate B: " + votes.B + "<br>" +
    "Candidate C: " + votes.C;

  show('results');
}

// BACK
function goBack(){
  show('role');
}
