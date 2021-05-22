// div where profile will appear
const profileDiv = document.querySelector(".overview");

// ul where repos are displayed
const displayRepos = document.querySelector(".repo-list");

// my GitHub username
const username = "heidi37";

//fetch info from my GitHub profile
const getProfileInfo = async function () {
    const response = await fetch (`https://api.github.com/users/${username}`);
    const profileData = await response.json();
    // console.log(profileData);
    displayUserInfo(profileData);
};

getProfileInfo();

//function to display the fetched user information on the page
const displayUserInfo = function (data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    profileDiv.append(userInfoDiv);
    getRepos();
};

//function to fetch the user's repots
const getRepos = async function () {
    const response = await fetch (`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    const repoData = await response.json();
    console.log(repoData);
    displayRepoDetails(repoData);
}



//function to display info about individual repo
const displayRepoDetails = function (repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        displayRepos.append(li);
    };
}




