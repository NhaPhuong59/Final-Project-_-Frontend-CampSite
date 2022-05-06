function UploadImages() {
    return (
        <form action="http://localhost:5000/api/image" method="post" enctype="multipart/form-data">
            <input type="file" name="image" />
            <input type="submit" name="submit" />
        </form>
    );
}

export default UploadImages;
