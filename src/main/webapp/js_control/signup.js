function refresh_validate_code() {
    $("#verfity_code_img").attr("src", $("#applicationContextPath").val() + "/rs/create_validate_code?t=" + new Date().getTime());
}