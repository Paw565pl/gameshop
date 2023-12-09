from django_filters import rest_framework as filters


class GameFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    minReleaseYear = filters.NumberFilter(
        field_name="released", lookup_expr="year__lte"
    )
    maxReleaseYear = filters.NumberFilter(
        field_name="released", lookup_expr="year__gte"
    )
    maxMetacritic = filters.NumberFilter(field_name="metacritic", lookup_expr="gte")
    minMetacritic = filters.NumberFilter(field_name="metacritic", lookup_expr="lte")
    genre = filters.CharFilter(
        label="Genre name", field_name="slug", method="filter_by_genre"
    )
    platform = filters.CharFilter(
        label="Platform name", field_name="slug", method="filter_by_platform"
    )
    developer = filters.CharFilter(
        label="Developer name", field_name="slug", method="filter_by_developer"
    )

    @staticmethod
    def filter_by_genre(queryset, name, value):
        return queryset.filter(
            genres={
                name: value,
            }
        )

    @staticmethod
    def filter_by_platform(queryset, name, value):
        return queryset.filter(
            platforms={
                name: value,
            }
        )

    @staticmethod
    def filter_by_developer(queryset, name, value):
        return queryset.filter(
            developers={
                name: value,
            }
        )
