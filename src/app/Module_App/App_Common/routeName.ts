export class RouteName {

    get default() {
        return '';
    }
    static Home = '';
    static Landing = 'landing';

    static Terminology = 'i18n';
    static TermsEdit = 'termsedit';
    static EditClient = 'editclient';
    static ManageTerm = 'manageterm';

    static Exception = 'error';
    static DefaultRoute = RouteName.Landing;
}
