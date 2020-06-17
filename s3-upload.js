var id_token; //token we get upon Authentication with Web Identiy Provider
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // The ID token you need to pass to your backend:
  id_token = googleUser.getAuthResponse().id_token;
};
function upload () {
  var file = $("#file")[0].files[0];
  AWS.config.credentials = new AWS.WebIdentityCredentials({
      RoleArn: '<INSERT-ROLE-ARN-HERE>',
    //ProviderId:
      WebIdentityToken: id_token // Access token from identity provider
  });
  var s3bucket = new AWS.S3({params: {Bucket: '<INSERT-NAME-OF-BUCKET-B>'}});
  var params = {Key: file.name, ContentType: file.type, Body: file};
  s3bucket.upload(params, function (err, data) {
    $('#results').html(err ? 'ERROR!' : 'UPLOADED :' + data.Location);
  });
}
