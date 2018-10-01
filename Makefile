# <makefile>
# Objects: refdata, package
# Actions: clean, build, deploy
help:
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
	for help_line in $${help_lines[@]}; do \
	    IFS=$$'#' ; \
	    help_split=($$help_line) ; \
	    help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
	    help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
	    printf "%-30s %s\n" $$help_command $$help_info ; \
	done
# </makefile>


port:= $(if $(port),$(port),8021)
server:= $(if $(server),$(server),http://localhost)
server_url:=$(server):$(port)
org_name=Tata Trust - NCD Screening

define _curl
	curl -X $(1) $(server_url)/$(2) -d $(3)  \
		-H "Content-Type: application/json"  \
		-H "ORGANISATION-NAME: $(org_name)"  \
		$(if $(token),-H "AUTH-TOKEN: $(token)",)
	@echo
	@echo
endef

su:=$(shell id -un)

create_org:
	psql -U$(su) openchs < create_organisation.sql

## <refdata>
deploy: ## Creates reference data by POSTing it to the server
	$(call _curl,POST,locations,@locations.json)
	$(call _curl,POST,catchments,@catchments.json)
	$(call _curl,POST,concepts,@concepts.json)
	$(call _curl,POST,forms,@registrationForm.json)
	$(call _curl,POST,forms,@cervicalCancerScreeningForm.json)
	$(call _curl,POST,forms,@breastCancerScreeningForm.json)
	$(call _curl,POST,forms,@oralCancerScreeningForm.json)
	$(call _curl,POST,forms,@hypertensionScreeningForm.json)
	$(call _curl,POST,forms,@diabetesScreeningForm.json)
	$(call _curl,POST,forms,@cervicalCancerReferralForm.json)
	$(call _curl,POST,forms,@breastCancerReferralForm.json)
	$(call _curl,POST,encounterTypes,@encounterTypes.json)
	$(call _curl,POST,operationalEncounterTypes,@operationalModules/operationalEncounterTypes.json)
	$(call _curl,POST,formMappings,@formMappings.json)
## </refdata>

create_deploy: create_org deploy