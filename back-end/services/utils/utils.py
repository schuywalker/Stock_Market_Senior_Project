

class serviceUtils:
    @staticmethod
    def formatResponse(response, format='%',  decimals=2,) -> str:
        if response is None:
            return 'none'
        if format == '$':
            return '$ ' + f'{(round(response, decimals)):,} '
        # if float(response < 1000) else '$ ' + str(round(response, decimals)) + 'todo: get commas figured out'

        elif format == '%':
            return str(round(response, decimals)) + ' %'
        else:
            return str(round(response, decimals))
