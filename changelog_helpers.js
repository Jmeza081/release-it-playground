module.exports = function (Handlebars) {
    Handlebars.registerHelper('sortReleasesByDate', function (releases) {
        return releases.sort(function(a, b) {
            return new Date(b.isoDate) - new Date(a.isoDate);
        });
    });

    /**
     * BE CAREFUL HERE. THIS IS A VERY NAIVE WAY OF PARSING OUT THE PARTS OF
     * THE COMMIT MESSAGE WE NEED. THIS EXAMPLE IS JUST A STARTING POINT. DO NOT USE
     * IT FOR PRODUCTION PURPOSES!
     */
    Handlebars.registerHelper('formatMessage', function () {
        // console.log(this);

        const { shorthash, message, href } = this;
        const jiraTicketPart = message.match(/\[([CWP])\w+-[0-9]+\]/gi) || '';

        if(!jiraTicketPart) {
            return message; // No point in parsing if we aren't following conventions
        }


        const commitHash = `[${shorthash}](${href})`;

        /**
         * Step: 1 Parse out the Jira ticket number from the message
         * example: CWP-123 
         */

        /**Step 2: Parse out affected component part. 
         * example: fix(Table) should output Table
         * 
         * If none is found, just return the message
         */

        /** Step 3: Parse out the message without the commit type and Jira ticket Number 
         * 
         * Example: "Fix(Table) CWP-123 I fixed a bug" should output "I fixed a bug"
         * 
        */

        //TODO: Need to ignore release commit messages.
        return `${commitHash} [CWP-123] AffectedComponent - Summary Message`;
    });
}