class GalleryGenerator {
    public generateGallery(images, htmlContent: string) {
        let imagesHTML = htmlContent;

        imagesHTML += "<div class=\"container\">   \r\n\t<div class=\"row\">";

        images.forEach(image => {
            imagesHTML += image;
        });
        imagesHTML += "</div></div>";
    }
}

export { GalleryGenerator };
