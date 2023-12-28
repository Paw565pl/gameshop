import json
from django.http import HttpResponse


class ExportJsonMixin:
    serializer_class = None

    def export_to_json(self, _, queryset):
        meta = self.model._meta  # noqa
        filename = f"{meta}.json"

        serializer = self.serializer_class(queryset, many=True)
        data = json.dumps(serializer.data, indent=2)

        response = HttpResponse(data, content_type="application/json")
        response["Content-Disposition"] = "attachment; filename={}".format(filename)

        return response

    export_to_json.short_description = "Export selected to JSON"
