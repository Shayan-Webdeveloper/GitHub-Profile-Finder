let input = document.querySelector('#username');
let searchbtn = document.querySelector("#search")
let status = document.querySelector("#status");
let img = document.querySelector("#img")
let name = document.querySelector("#name")
let bio = document.querySelector("#bio")
let followers = document.querySelector("#followers")
let following = document.querySelector("#following")
let repo = document.querySelector("#repos")
let profile = document.querySelector("#profile-card")
let profileLink = document.querySelector("#profile-link")
profile.style.display = "none"

async function findUser() {
     let searchName = input.value.trim()
     if (searchName === "") {
          status.textContent = "Please enter a username"
     }
     try {
          status.textContent = "Loading..."
          let response = await fetch(`https://api.github.com/users/${searchName}`)
          if (!response.ok) {
               throw new Error("User not found")
          }

          let data = await response.json()
          img.src = data.avatar_url
          name.textContent = data.name || data.Login
          bio.textContent = data.bio || "No bio available"
          followers.textContent = data.followers
          following.textContent = data.following
          repo.textContent = data.public_repos
          profileLink.href = data.html_url
          status.textContent = "User Found"
          profile.style.display = "block"
          console.log(data);
          
          
     } catch (error) {
          status.textContent = "User not found"
          profile.style.display = "none"     
     }
}

searchbtn.addEventListener("click", findUser)

input.addEventListener("keypress", function(e) {
     if (e.key === "Enter") {
          findUser()
     }
})