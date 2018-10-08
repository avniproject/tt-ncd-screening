const {RuleFactory, FormElementStatusBuilder, FormElementsStatusHelper, FormElementStatus} = require('rules-config/rules');
const filter = RuleFactory('0124afcd-b832-4a8c-b34c-0da5b26d2fc6', 'ViewFilter');
const RuleHelper = require('./RuleHelper');

@filter('33de0a68-c265-49a6-94de-0d99d2873ca4', 'Doctor Visit Form Handler', 100.0)
class CervicalCancerReferralFormStatus {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new CervicalCancerReferralFormStatus(), programEncounter, formElementGroup, today);
    }

    cryotherapyDone(programEncounter, formElement) {
        return RuleHelper.encounterCodedObsHas(programEncounter, formElement, "Lesions eligible for cyrotherapy", "Yes");
    }

    pleaseDoCyrotherapyWithinNext2Weeks(programEncounter, formElement) {
        return RuleHelper.encounterCodedObsHas(programEncounter, formElement, "Cyrotherapy done", "No");
    }

    adviseThePatientForFollowUpAfter1YearWithVia(programEncounter, formElement) {
        let statusBuilder = new FormElementStatusBuilder({programEncounter, formElement});
        statusBuilder.show().when.valueInEncounter("Cyrotherapy done").containsAnyAnswerConceptName("Yes").or.when.valueInEncounter("CIN Grade").containsAnyAnswerConceptName("1").or.when.valueInEncounter("CIN Grade").containsAnyAnswerConceptName("2");
        return statusBuilder.build();
    }

    cinGrade(programEncounter, formElement) {
        return RuleHelper.encounterCodedObsHas(programEncounter, formElement, "Cyrotherapy done", "No");
    }

    leepDone(programEncounter, formElement) {
        return RuleHelper.encounterCodedObsHas(programEncounter, formElement, "CIN Grade", "2", "3");
    }

    advicePatientToGetLeepDoneInNextTwoWeeks(programEncounter, formElement) {
        return RuleHelper.encounterCodedObsHas(programEncounter, formElement, "Leep done", "No");
    }

    nameOfTertiaryCancerCenter(programEncounter, formElement) {
        return RuleHelper.encounterCodedObsHas(programEncounter, formElement, "CIN grade", "Cancer");
    }
}

module.exports = {DoctorVisitFormHandler: CervicalCancerReferralFormStatus};
