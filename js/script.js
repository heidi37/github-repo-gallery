// div where profile will appear
const profileDiv = document.querySelector(".overview");

// ul where full repo list displayed
const displayRepos = document.querySelector(".repo-list");

// section where the repo info appears
const repoSection = document.querySelector(".repos");

// section where individual repo data appears
const indRepoData = document.querySelector(".repo-data");

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

// listening for clicks on repos UL particularly interested in H3s
displayRepos.addEventListener("click", function (e) {
    //was the click on an H3?
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        // console.log(repoName);
        getSpecficRepoInfo(repoName);
    }

});

// function to get specfic repo info
const getSpecficRepoInfo = async function (repoName) {
    const response = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (language in languageData) {
        languages.push(language);
    };
    console.log(languages);
    displaySpecificRepoInfo(repoInfo, languages);
};

//function to display specific repo inro
const displaySpecificRepoInfo = function (repoInfo, languages) {
    indRepoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    indRepoData.append(div);
    indRepoData.classList.remove("hide");
    repoSection.classList.add("hide");

};






