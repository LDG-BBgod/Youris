from django.shortcuts import redirect

def superUser_required(function):
    def wrap(request, *args, **kwargs):
        superUser = request.session.get('superUser')
        if superUser is None or not superUser:
            return redirect('/caLogin')
        return function(request, *args, **kwargs)
    return wrap