<h2>About the API </h2>

<p> The API connects to Azure's computer vision API and contains 2 endpoints. The
purpose of this API is to assist with image labeling and removal of image backgrounds.
To understand how to use the API, refer below:
</p>

This API only contains 2 endpoints:

<h2> POST /describe </h2>
<p> The describe endpoint takes an image and provides a description of image. </p>
<p><strong>parameters:</strong></p>

<p> &nbsp;&nbsp;confidence - a decimal value between 0 and 1 (refer to the details below on what this is).
<br> &nbsp;&nbsp;&nbsp;
When a machine learning algorithm makes a prediction, there is a confidence score associated with it. Azure's computer vision
predictions for captions and tags have a confidence associated with them. Adjusting this confidence will grab the cap
</p>

<h4> Headers </h4>
<p> &nbsp;{ <br>
  &nbsp;&nbsp;  "Content-Type" : "multipart/form-data"
&nbsp;<br>}&nbsp; </p>

<h4> Request Body </h4>

photo: <br>
&nbsp;&nbsp; data type: File
<br>
&nbsp;&nbsp; description: This is the image that you want to describe.

<h2> POST /remove-background </h2>
<p> This endpoint takes an image passed in and removes the background </p>

<h2>How do I use these endpoints? </h2>
