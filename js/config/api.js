const apiUrl = "http://localhost:3000/api/";
export default {
    signUp : apiUrl+"signup",
    login : apiUrl+"login",
    profile : apiUrl+"profile",
    updateProfile: apiUrl+"profile",
    update_profile_image: apiUrl+"updateProfileImage",
    contactList : apiUrl+"contact",
    updateContact : apiUrl+"contact/update_contact",
    addContact : apiUrl+"contact/add_contact",
    updatePassword : apiUrl+"updatePassword",
    getServerChallenegeData : apiUrl+"challange/getServerChallenegeData",
    createChallange : apiUrl+"challange/create",
    lobby : apiUrl+"challange/lobby",
    challangeInfo : apiUrl+"challange/challenge_detail",
    deleteChallange: apiUrl+"challange/deleteChallange",
   
}