class InquiryController {
  index(req, res) {
    res.render('admin/inquiries/index', {
      title: 'Sales'
    });
  }
}

module.exports = new InquiryController();
