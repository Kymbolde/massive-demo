select 
	incidents.id,
	incidents.us_state,
	injuries.name as injury_name,
	affected_areas.name as affected_areas,
	causes.name as cause 
from incidents
join injuries on injuries.id = incidents.injury_id
join affected_areas on injuries.affected_area_id = affected_areas.id
join causes on incidents.cause_id = causes.id
where upper(causes.name) like upper($1"%");